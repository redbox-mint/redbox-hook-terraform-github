/*
 Google Cloud - Terraform Provisioner plugin
 */
const _ = require('lodash');
const fs = require('fs-extra');
const { resolve } = require('path');
const { basename } = require('path');

async function getFiles(dir) {
  const subdirs = await fs.readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await fs.stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

var walkSync = function(dir, filelist) {
  var files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    const resolved = resolve(dir, file);
    if (fs.statSync(resolved).isDirectory()) {
      filelist = walkSync(resolved , filelist);
    } else {
      filelist.push(resolved);
    }
  });
  return filelist;
};

const hook_log_header = "Terraform Provisioner Github repo";
const hook_root_dir = "node_modules/@researchdatabox/redbox-hook-terraform-github"

module.exports = function (sails) {
  return {
    initialize: function (cb) {
      // Do Some initialisation tasks
      // This can be for example: copy files or images to the redbox-portal front end
      // Wait for the main redbox-hook-terraform plugin to load...
      sails.log.info(hook_log_header+ "::Waiting on dependent on hook to init...");
      sails.after(["hook:redbox-hook-terraform:loaded"], function() {
        sails.log.info(hook_log_header+ "::Dependent hook loaded, initing...");
        // read custom configuration and merge with sails.config
        const config_dirs = [hook_root_dir + "/form-config", hook_root_dir + "/config"];
        _.each(config_dirs, (config_dir) => {
          if (fs.pathExistsSync(config_dir)) {
            const files = walkSync(config_dir, []);
            sails.log.info(hook_log_header + "::Processing:");
            sails.log.info(files);
            const concatArrsFn = function (objValue, srcValue, key) {
              if (_.isArray(objValue)) {
                return objValue.concat(srcValue);
              }
            }
            _.each(files, (file_path) => {
              const config_file = require(file_path);
              _.mergeWith(sails.config, config_file, concatArrsFn);
            });
          } else {
            sails.log.info(hook_log_header + "::Skipping, directory not found:" + config_dir);
          }
        });

        // language file updates ... only English for now
        // locales directory moved out of assets directory so we can safely merge
        const language_file_path = resolve("assets/locales/en/translation.json");
        const hook_language_file_path = resolve(hook_root_dir, "locales/en/translation.json");
        if (fs.pathExistsSync(language_file_path) && fs.pathExistsSync(hook_language_file_path)) {
          sails.log.info(hook_log_header + ":: Merging English translation file...");
          const mainTranslation = require(language_file_path);
          const hookTranslation = require(hook_language_file_path);
          _.merge(mainTranslation, hookTranslation);
          fs.writeFileSync(language_file_path, JSON.stringify(mainTranslation, null, 2));
        }

        //If assets directory exists, there must be some assets to copy over
        if(fs.pathExistsSync(hook_root_dir + "/assets/")) {
          sails.log.info(hook_log_header + ":: Copying branding...");
          fs.copySync(hook_root_dir + "/assets/","assets/");
          fs.copySync(hook_root_dir + "/assets/",".tmp/public/");
        }

        //If views directory exists, there must be some views to copy over
        if(fs.pathExistsSync(hook_root_dir + "/views/")) {
          fs.copySync(hook_root_dir + "/views/","views/");
        }

        // Load up all the services ...
        const servicesDir = resolve(hook_root_dir, "api/services");
        if (fs.pathExistsSync(servicesDir)) {
          const files = walkSync(servicesDir, []);
          _.each(files, (file_path) => {
            const service = require(file_path);
            const serviceName = basename(file_path, '.js')
            sails.services[serviceName] = service;
          });
        }
        // Load up all controllers ...
        const controllersDir = resolve(hook_root_dir, "api/controllers");
        if (fs.pathExistsSync(controllersDir)) {
          const files = walkSync(controllersDir, []);
          _.each(files, (file_path) => {
            const controller = require(file_path);
            sails.controllers[basename(file_path, '.js')] = controller;
          });
        }
        sails.log.info(hook_log_header+ "::Init ok.");
        return cb();
      });
    },
    //If each route middleware do not exist sails.lift will fail during hook.load()
    routes: {
      before: {},
      after: {
      }
    },
    configure: function () {
    }
  }
};
