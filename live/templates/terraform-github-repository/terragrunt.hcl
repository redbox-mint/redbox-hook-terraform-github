terraform {
  source = "../../../../redbox-hook-terraform-github/modules//terraform-github-repository"
}

# Include all settings from the root terragrunt.hcl file
include {
  path = find_in_parent_folders()
}
