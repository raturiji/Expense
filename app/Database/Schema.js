export default Schema = {
    User: { name: 'User',
    primaryKey: 'id',
    properties:
      { id:'int',
        FirstName:'string',
        LastName:'string',
        Image: 'string',
        Income:'int',
        Savings:'int'
      }},
    Expense: { name:'Expense',
        primaryKey:'id',
        properties:
        { id: 'int',
            Title: 'string',
            Amount: 'int',
            Image: 'string',
            DateAndTime: 'string',
            User: 'int'
        }},
    Income: { name:'Income',
        primaryKey:'id',
        properties:
        { id: 'int',
            Title: 'string',
            Amount: 'int',
            Image: 'string',
            DateAndTime: 'string',
            User: 'int'
        }},
    }