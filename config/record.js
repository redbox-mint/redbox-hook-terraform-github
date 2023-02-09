module.exports.record = {
  customFields: {
    '@rdmp': {
      source: 'request',
      type: 'header',
      field: 'referrer',
      parseUrl: true,
      searchParams: 'rdmp'
    }
  }
};
