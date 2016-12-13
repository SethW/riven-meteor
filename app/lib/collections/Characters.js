import SimpleSchema from 'simpl-schema';
Characters = new Mongo.Collection('characters');

Schema = {};

Schema.attack = new SimpleSchema({

      "_id": {
        type: String,
        label: "ID"
      },
      "name": {
        type: String,
        label: "Name"
      },
      "range": {
        type: Number,
        label: "Range"
      },
      "status": {
        type: String,
        label: "Status"
      },
      "actions": {
        type: Number,
        label: "Actions"
      },
      "accuracy": {
        type: Number,
        label: "Accuracy"
      },
      "area": {
        type: Number,
        label: "Area"
      },
      "effects": {
        type: Array,
        label: "Effects",
        optional: true,
      },
        "effects.$": {
          type: Object,
        },
          "effects.$.effect": {
            type: String,
            label: "Effect",
            optional: true,
          },
      "types": {
        type: Array,
        label: "Types",
        optional: true,
      },
        "types.$": {
          type: Object,
        },
          "types.$.type": {
            type: String,
            label: "Type",
            optional: true,
          },
      "power": {
        type: Array,
        label: "Power"
      },
        "power.$": {
          type: Object
        },
          "power.$.options": {
            type: String,
            label: "Options"
          },
          "power.$.multiplier": {
            type: Number,
            label: "Multiplier"
          },
});

Schema.types = new SimpleSchema({
    "type": {
      type: String,
      label: "Type",
      optional: true,
    },
});

Schema.immunity = new SimpleSchema({
    "immunity": {
      type: String,
      label: "Immunity",
      optional: true,
    },
});

Schema.Characters = new SimpleSchema({
  _id: {
    type: String,
    label: "ID",
  },
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
    optional: true,
  },
    "types.$": {
      type: Schema.types
    },
  immunities: {
    type: Array,
    optional: true,
  },
    "immunities.$": {
      type: Schema.immunity
    },
  attacks: {
    type: Array,
    label: "Attacks",
  },
    "attacks.$": {
      type: Schema.attack
    },

  /*
  abilities: {
    type: Array,
    label: "Abilities",
  },
    "abilities.$": {
      type: Object
    },
      "abilities.$.id": {
        type: String,
        label: "ID"
      },
      "abilities.$.name": {
        type: String,
        label: "Name"
      },
      "abilities.$.range": {
        type: Number,
        label: "Range"
      },
      "abilities.$.status": {
        type: String,
        label: "Status"
      },
      "abilities.$.actions": {
        type: Number,
        label: "Actions"
      },
      "abilities.$.accuracy": {
        type: Number,
        label: "Accuracy"
      },
      "abilities.$.area": {
        type: Number,
        label: "Area"
      },
      "abilities.$.effects": {
        type: Array,
        label: "Effects"
      },
        "abilities.$.effects.$": {
          type: Object,
        },
          "abilities.$.effects.$.effect": {
            type: String,
            label: "Effect"
          },
      "abilities.$.types": {
        type: Array,
        label: "Types"
      },
        "abilities.$.types.$": {
          type: Object,
        },
          "abilities.$.types.$.type": {
            type: String,
            label: "Type"
          },
      "abilities.$.power": {
        type: Array,
        label: "Power"
      },
        "abilities.$.power.$": {
          type: Object
        },
          "abilities.$.power.$.options": {
            type: String,
            label: "Options"
          },
          "abilities.$.power.$.multiplier": {
            type: Number,
            label: "Multiplier"
          },
*/
});
