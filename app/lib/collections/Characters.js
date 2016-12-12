CharacterSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
  },
  maxHealth: {
    type: Number,
    label: "Max Health"
  },
  actions: {
    type: Number,
    label: "Actions"
  },
  movement: {
    type: Number,
    label: "Movement"
  },
  dodge: {
    type: Number,
    label: "Dodge"
  },
  armor: {
    type: Number,
    label: "Armor"
  },
  types: {
    type: Array,
    label: "Types",
  },
    "types.$": {
      type: Object
    },
      "types.$.type": {
        type: String,
        label: "Type"
      },
  immunities: {
    type: Array,
    label: "Immunities",
  },
    "immunities.$": {
      type: Object
    },
      "immunities.$.immunity": {
        type: String,
        label: "Immunity"
      },
});
