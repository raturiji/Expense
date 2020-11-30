const Schema = {
  User: {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'int',
      FirstName: 'string',
      LastName: 'string',
      Image: 'string',
      Income: 'int',
      Savings: 'int',
      DateOfCreation: 'string',
    },
  },
  Expense: {
    name: 'Expense',
    primaryKey: 'id',
    properties: {
      id: 'int',
      Title: 'string',
      Amount: 'int',
      Image: 'string',
      DateOfCreation: 'string',
      Category: 'string',
      User: 'int',
    },
  },
  Income: {
    name: 'Income',
    primaryKey: 'id',
    properties: {
      id: 'int',
      Title: 'string',
      Amount: 'int',
      Image: 'string',
      DateOfCreation: 'string',
      User: 'int',
    },
  },
  Category: {
    name: 'Category',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      DateOfCreation: 'string',
      Image: 'string',
      User: 'int',
      Threshold: 'int',
      TotalAmount: 'int',
    },
  },
};

export default Schema;
