module.exports.recordtype = {
  "terraform-github-repository": {
    "packageType": "workspace",
    "searchable": false,
    "searchFilters": [
      {
        name: "text_title",
        title: "search-refine-title",
        type: "exact",
        typeLabel: "search-refine-contains"
      },
      {
        name: "text_description",
        title: "search-refine-description",
        type: "exact",
        typeLabel: "search-refine-contains"
      }
    ],
    hooks: {
      onCreate: {
        pre: [
          {
            function: 'sails.services.TerraformService.prepareProvision',
            options: {
              "action": "create"
            }
          }
        ],
        post: [
          {
            // must be called on Post as this is a potentially long-running method
            function: 'sails.services.TerraformService.provision',
            options: {
              "action": "create"
            }
          }
        ]
      }
    }
  }
};
