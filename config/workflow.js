module.exports.workflow = {
  "terraform-github-repository": {
    "terraform-github-repository-draft": {
      config: {
        workflow: {
          stage: 'draft',
          stageLabel: 'Waiting to commence provisioning',
        },
        authorization: {
          viewRoles: ['Admin', 'Librarians'],
          editRoles: ['Admin', 'Librarians']
        },
        form: 'terraform-github-repository-1.0-draft'
      },
      starting: true
    },
    "terraform-github-repository-provisioning": {
      config: {
        workflow: {
          stage: 'provisioning',
          stageLabel: 'Provisioning',
        },
        authorization: {
          viewRoles: ['Admin', 'Librarians'],
          editRoles: ['Admin', 'Librarians']
        },
        form: 'terraform-github-repository-1.0-provisioning'
      }
    },
    "terraform-github-repository-provisioned": {
      config: {
        workflow: {
          stage: 'provisioned',
          stageLabel: 'Provisioned',
        },
        authorization: {
          viewRoles: ['Admin', 'Librarians'],
          editRoles: ['Admin', 'Librarians']
        },
        form: 'terraform-github-repository-1.0-provisioned'
      }
    }
  }
};
