terraform {
  # The configuration for this backend will be filled in by Terragrunt
  backend "gcs" {}

  # The latest version of Terragrunt (v0.19.0 and above) requires Terraform 0.12.0 or above.
  required_version = ">= 1.3.7"


  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }
}

# Configure the GitHub Provider
provider "github" {
  owner = var.repo_owner
}


resource "github_repository" "code_repo" {
  name        = var.repository_name
  description = var.repository_description

  visibility = "public"

  template {
    owner                = "andrewbrazzatti"
    repository           = "testing-from-redbox"
    include_all_branches = true
  }
}

resource "github_repository_file" "repo_info_file" {
  repository          = github_repository.code_repo.name
  branch              = "main"
  file                = "REPO_INFO.md"
  content             = "This code project was provisioned for the RDMP with id: ${var.rdmp_oid}"
  commit_message      = "Repository information provided by the provisioning process"
  commit_author       = "Terraform User"
  commit_email        = "terraform@example.com"
  overwrite_on_create = true
}

