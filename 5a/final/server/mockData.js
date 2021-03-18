const heroes = [
  {
    id: 1,
    name: "Iron Man",
    team: "Avengers",
    secretIdentity: "Tony Stark",
    salary: 0.99,
    description: "Man with iron suit",
    strength: 4.2,
    logoUrl: "assets/logos/iron-man.png",
  },
  {
    id: 2,
    name: "Thor",
    team: "Avengers",
    secretIdentity: "Thor Odinson",
    salary: 10.99,
    description: "Norse god of thunder",
    strength: 4.5,
    logoUrl: "assets/logos/thor.png",
  },
  {
    id: 3,
    name: "Superman",
    team: "Justice League",
    secretIdentity: "Clark Kent",
    salary: 3500,
    description: "Man of steel",
    strength: 5.0,
    logoUrl: "assets/logos/superman.png",
  },
  {
    id: 4,
    name: "Deadpool",
    team: "X-men",
    secretIdentity: "Wade Wilson",
    salary: 15000,
    description: "Fun to hang out with ... in short doses",
    strength: 3.2,
    logoUrl: "assets/logos/deadpool.png",
  },
  {
    id: 5,
    name: "Wonder Woman",
    team: "Justice League",
    secretIdentity: "Diana z Themysciry",
    salary: 10000,
    description: "Amazon warrior",
    strength: 4.4,
    logoUrl: "assets/logos/wonder-woman.png",
  },
];
const newHero = {
  id: null,
  name: "",
  team: "",
  secretIdentity: "",
  salary: 0,
  description: "",
  strength: 0,
  logoUrl: "",
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newHero,
  heroes,
};
