# Terraform RedBox Hook Provisioner Demonstration Module: Github

This is a dependent module for [ReDBox's](https://www.redboxresearchdata.com.au) [Terraform provisioner hook](https://github.com/redbox-mint/redbox-hook-terraform).  

This GitHub provisioner has been packaged as it's own hook to demonstrate a working configuration set. Depending on your deployment and version management requirements, this might be a suitable method of deploying the provisioner. For simple provisioners where there is no custom handler code required (such as this one), it may be simpler to include all the required configuration in your main branding and configuration hook.

## Responsibilities

- Provide manifests to provision Github Repositories

## Requirements

The demonstration configuration is using terraform's GCP backend to manage state. This can be changed to suit the infrastructure available to the implementation (e.g. using local or AWS S3) but typically each have their own requirements around credentials and settings to use them. Please see Terraform's [backend documentation for more information](https://developer.hashicorp.com/terraform/language/settings/backends/configuration).

This plugin uses the Terraform Github provider, see the [documentation on the Terraform registry](https://registry.terraform.io/providers/integrations/github/latest/docs) for authentication and configuration options.

