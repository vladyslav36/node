const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString
} = require('graphql')
const fetch=require('node-fetch-commonjs')

// Hardcoded data
// const customers = [
//   {id:'1',name:'John', age:32,email:'john@gmail.com'},
//   {id:'2',name:'Jane', age:35,email:'janen@gmail.com'},
//   {id:'3',name:'Sara', age:45,email:'sara@gmail.com'},
//   {id:'4',name:'Alex', age:42,email:'alexn@gmail.com'},
// ]

// CustomerType
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => (
  {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    email: { type: GraphQLString }    
  }
  ) 
})

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id:{type:GraphQLString}
      },
      resolve(parentValue, args) {
        // for (let i = 0; i < customers.length; i++){
        //   if (customers[i].id === args.id) {
        //     return customers[i]
        //   }
        // }
        return fetch(`http:localhost:3000/customers/${args.id}`).then(res=>res.json())
      }
    },
    customers: {
      type:new GraphQLList(CustomerType),
      resolve() {
        return fetch('http://localhost:3000/customers').then(res=>res.json())
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query:RootQuery
})