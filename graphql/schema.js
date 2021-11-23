const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = graphql;
const Cursos = [
  {
    id: "1",
    nombre: "patrones de diseño java",
    lenguaje: "java",
    fecha: "2021",
    profesorId : "2"
  },
  {
    id: "2",
    nombre: "patrones de diseño kotlin",
    lenguaje: "kotlin",
    fecha: "2021",
    profesorId : "2"
  },
  {
    id: "3",
    nombre: "patrones de diseño C",
    lenguaje: "C",
    fecha: "2021",
    profesorId : "1"
  },
  {
    id: "4",
    nombre: "patrones de diseño C++",
    lenguaje: "C++",
    fecha: "2021",
    profesorId : "1"
  },
];
const Profesores = [
  {
    id: "1",
    nombre: "Santiago",
    edad: 26,
    estado: true,
    fecha: "2021",
    
  },
  {
    id: "2",
    nombre: "Juana",
    edad: 35,
    estado: false,
    fecha: "2021",
  },
  {
    id: "3",
    nombre: "Simon",
    edad: 50,
    estado: true,
    fecha: "2020",
  },
  {
    id: "4",
    nombre: "Camila",
    edad: 32,
    estado: false,
    fecha: "2021",
  },
];

const Usuarios =[
    {
    id: "1",
    nombre: "Simon",
    email : "juan@gmail.com",
    password : "123"
    },
    {
        id: "2",
        nombre: "Sara",
        email : "sara@gmail.com",
        password : "111"
    },
    {
        id: "3",
        nombre: "Luisa",
        email : "Luisa@gmail.com",
        password : "222"
    },
    {
        id: "4",
        nombre: "Felipe",
        email : "Felipe@gmail.com",
        password : "1234"
    }

]

const CursoType = new GraphQLObjectType({
  name: "Curso",
  fields: () => ({
    id: { type: GraphQLString },
    nombre: { type: GraphQLString },
    lenguaje: { type: GraphQLString },
    fecha: { type: GraphQLString },
    profesor : {
        type: ProfesorType,
        resolve(parent, args){
            return Profesores.find((profesor) => profesor.id === parent.profesorId);

        }
    }
  }),
});

const ProfesorType = new GraphQLObjectType({
  name: "Profesor",
  fields: () => ({
    id: { type: GraphQLString },
    nombre: { type: GraphQLString },
    edad: { type: GraphQLInt },
    estado: { type: GraphQLBoolean },
    fecha: { type: GraphQLString },
    cursos: {
        type : new GraphQLList(CursoType),
        resolve(parent, args){
            return Cursos.filter((curso) => curso.profesorId === parent.id);

        }

    }
  }),
});

const UsuarioType = new GraphQLObjectType({
    name: "Usuario",
  fields: () => ({
    id: { type: GraphQLString },
    nombre: { type: GraphQLString },
    email : {type : GraphQLString},
    password : {type : GraphQLString}
  }),

})

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    curso: {
      type: CursoType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return Cursos.find((curso) => curso.id === args.id);
      },
    },
    cursos: {
        type: new GraphQLList(CursoType),
        
        resolve() {
          return Cursos;
        },
      },
    profesor: {
      type: ProfesorType,
      args: {
        nombre: {
          type: GraphQLString,
        },
      },
      resolve(parents, {nombre}) {
        return Profesores.find((profesor) => profesor.nombre === nombre);
      },
    },
    profesores: {
        type: new GraphQLList(ProfesorType),
        
        resolve() {
          return Profesores;
        },
      },
    usuario :{
        type : UsuarioType,
        args: {
            email: {
              type: GraphQLString,
            },
          },
          resolve(parents, {email}) {
            return Usuarios.find((usuario) => usuario.email === email);
          },

    },
    usuarios :{
        type : new GraphQLList(UsuarioType),
        
          resolve() {
            return Usuarios;
          },

    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
