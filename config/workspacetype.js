// TODO: move all text config to language files
module.exports.workspacetype = {
  'terraform-github-repository': {
    name: 'terraform-github-repository',
    label: 'Github Repository',
    subtitle: 'Github Repository',
    description: 'Provision a github repository based on a standard template',
    logo: '/images/Github_logo.png',
    defaultLocation: '@hook-tf-github-repository-workspace-default-location',
    // TF/TG config
    terragrunt_base: '/opt/redbox-portal/node_modules/@researchdatabox/redbox-hook-terraform-github/live/',
    // Note, other variables are too sensitive/risky to be placed in a config file
    // Please inject these via environment variables. See README.
    repo_owner: 'redbox-mint-contrib',
    vm_image: 'centos-cloud/centos-7',
    service: 'ConfigurableTerraformProvisioningHelperService',
    inputMappings: {
      repository_name: "<%= record.metadata.title %>",
      repository_description: "<%= record.metadata.description %>",
      rdmp_oid: "<%= record.metadata.rdmpOid %>",
      repo_owner: "<%= 'redbox-mint-contrib' %>"
    },
    locationMapping: {
      label: "<%= output.repository_details.value.name %>",
      link: "<%= output.repository_details.value.html_url %>"
    },
    postProvisionState: 'provisioned'
  }
}
