const { BaseUser, Reward, Task, Child, Parent } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return BaseUser.find();
    },

    user: async (parent, { userId }) => {
      return BaseUser.findOne({ _id: userId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return BaseUser.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    getTasks: async (parent, {userId}, context)=>{
      if (context.user){
        let tasks = []
        const user = await Child.findById({_id: userId}, 'tasks')
        console.log(user)
        // const token = signToken(user)
        return {token, user}
      }
      throw AuthenticationError
    },
    getRewards: async (parent, {userId}, context)=>{

    }
  },

  Mutation: {
    addParent: async (parent, { username, email, password }) => {
      const user = await Parent.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    addChild: async (parent, { name, password }, context) => {
      if (context.user){
        const child = await Child.create({username, password})
        const parent = await Parent.findByIdAndUpdate({_id: context.user._id}, {
          $addToSet: {kids: child}
        })        

        const token = signToken(user);
  
        return { token, user };
      }
      throw AuthenticationError
    },
    login: async (parent, { username, password }) => {
      const user = await BaseUser.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    // Set up mutation so a logged in user can only remove their user and no one else's
    //TODO Consider changing this to allow parent to delete their kids as well...
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
