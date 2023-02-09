
const commonFields =  [
  {
    class: 'Container',
    compClass: 'TextBlockComponent',
    definition: {
      name: 'header-title',
      value: '@hook-tf-github-repository-title',
      type: 'h2'
    }
  },
  {
    class: 'Container',
    compClass: 'TextBlockComponent',
    definition: {
      name: 'header-description',
      value: '@hook-tf-github-repository-description',
      type: 'h4'
    }
  },
  {
    class: "ParameterRetriever",
    compClass: 'ParameterRetrieverComponent',
    editOnly: true,
    definition: {
      name: 'parameterRetriever',
      parameterName:'rdmp'
    }
  },
  {
    class: 'RecordMetadataRetriever',
    compClass: 'RecordMetadataRetrieverComponent',
    editOnly: true,
    definition: {
      name: 'rdmpGetter',
      subscribe: {
        'parameterRetriever': {
          onValueUpdate: [{
            action: 'publishMetadata'
          }]
        }
      }
    }
  },
  {
    class: 'HiddenValue',
    definition: {
      name: 'rdmpOid',
      subscribe: {
        'rdmpGetter': {
          onValueUpdate: [
            {
              action: 'utilityService.getPropertyFromObject',
              field: 'oid'
            }
          ]
        }
      }
    }
  },
  {
    class: 'HiddenValue',
    definition: {
      name: 'rdmpTitle',
      subscribe: {
        'rdmpGetter': {
          onValueUpdate: [
            {
              action: 'utilityService.getPropertyFromObject',
              field: 'title'
            }
          ]
        }
      }
    }
  },
  {
    class: 'HiddenValue',
    definition: {
      name: 'type',
      value: '@hook-tf-github-repository-title'
    }
  },
  {
    class: 'TextField',
    definition: {
      name: 'title',
      label: '@hook-tf-github-repository-repository-name',
      required: true
    }
  },
  {
    class: 'TextArea',
    compClass: 'TextAreaComponent',
    editOnly: true,
    definition: {
      name: 'description',
      label: '@hook-tf-github-repository-label-description',
      rows: 10,
      cols: 10,
      required: false
    }
  }
];

const draftFields = commonFields.slice(0);
draftFields.push({
  class: 'SaveButton',
  compClass: 'SaveButtonComponent',
  definition: {
    label: "@hook-tf-github-repository-create-workspace",
    targetStep: 'terraform-github-repository-provisioning',
    closeOnSave: true,
    redirectLocation: '/@branding/@portal/record/edit/@rdmp?focusTabId=workspaces'
  },
  variableSubstitutionFields: ['redirectLocation']
});

// TODO: change to read only fields later
const readOnlyFields = commonFields.slice(0);

module.exports.form = {
  forms: {
    "terraform-github-repository-1.0-draft": {
      name: "terraform-github-repository-1.0-draft",
      type: "terraform-github-repository",
      skipValidationOnSave: true,
      editCssClasses: 'row col-md-12',
      viewCssClasses: 'row col-md-offset-1 col-md-10',
      messages: {
        "saving": ["@dmpt-form-saving"],
        "validationFail": ["@dmpt-form-validation-fail-prefix", "@dmpt-form-validation-fail-suffix"],
        "saveSuccess": ["@dmpt-form-save-success"],
        "saveError": ["@dmpt-form-save-error"]
      },
      fields: draftFields
    },
    "terraform-github-repository-1.0-provisioning": {
      name: "terraform-github-repository-1.0-provisioning",
      type: "terraform-github-repository",
      skipValidationOnSave: true,
      editCssClasses: 'row col-md-12',
      viewCssClasses: 'row col-md-offset-1 col-md-10',
      messages: {
        "saving": ["@dmpt-form-saving"],
        "validationFail": ["@dmpt-form-validation-fail-prefix", "@dmpt-form-validation-fail-suffix"],
        "saveSuccess": ["@dmpt-form-save-success"],
        "saveError": ["@dmpt-form-save-error"]
      },
      fields: readOnlyFields
    },
    "terraform-github-repository-1.0-provisioned": {
      name: "terraform-github-repository-1.0-provisioned",
      type: "terraform-github-repository",
      skipValidationOnSave: true,
      editCssClasses: 'row col-md-12',
      viewCssClasses: 'row col-md-offset-1 col-md-10',
      messages: {
        "saving": ["@dmpt-form-saving"],
        "validationFail": ["@dmpt-form-validation-fail-prefix", "@dmpt-form-validation-fail-suffix"],
        "saveSuccess": ["@dmpt-form-save-success"],
        "saveError": ["@dmpt-form-save-error"]
      },
      fields: readOnlyFields
    }
  }
};
