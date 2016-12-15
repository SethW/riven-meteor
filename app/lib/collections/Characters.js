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
          type: String,
          optional: true,
        },
      "types": {
        type: Array,
        label: "Types",
        optional: true,
      },
        "types.$": {
          type: String,
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

Schema.ability = new SimpleSchema({

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
          type: String,
          optional: true,
        },
      "types": {
        type: Array,
        label: "Types",
        optional: true,
      },
        "types.$": {
          type: String,
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


Schema.condition = new SimpleSchema({
      "type": {
        type: String,
        label: "Type"
      },
      "key": {
        type: String,
        label: "Key"
      },
      "compare": {
        type: String,
        label: "Compare"
      },
      "value": {
        type: String,
        label: "Value"
      },
      "results": {
        type: Object,
        label: "Results"
      },
        "results.maxHealth": {
          type: Number,
          label: "Max Health",
          optional: true,
        },
        "results.actions": {
          type: Number,
          label: "Actions",
          optional: true,
        },
        "results.movement": {
          type: Number,
          label: "Movement",
          optional: true,
        },
        "results.dodge": {
          type: Number,
          label: "Dodge",
          optional: true,
        },
        "results.armor": {
          type: Number,
          label: "Armor",
          optional: true,
        },
        "results.types": {
          type: Array,
          optional: true,
        },
          "results.types.$": {
            type: String,
            optional: true
          },
        "results.immunities": {
          type: Array,
          optional: true,
        },
          "results.immunities.$": {
            type: String,
            optional: true
          },
        "results.attacks": {
          type: Array,
          label: "Attacks",
          optional: true
        },
          "results.attacks.$": {
            type: Schema.attack
          },
        "results.abilities": {
          type: Array,
          label: "Abilities",
          optional: true
        },
          "results.abilities.$": {
            type: Schema.ability
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
  },
  value: {
    type: Number,
    label: "Value",
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
      type: String,
      optional: true
    },
  immunities: {
    type: Array,
    optional: true,
  },
    "immunities.$": {
      type: String,
      optional: true
    },
  attacks: {
    type: Array,
    label: "Attacks",
    optional: true
  },
    "attacks.$": {
      type: Schema.attack
    },
  abilities: {
    type: Array,
    label: "Abilities",
    optional: true
  },
    "abilities.$": {
      type: Schema.ability
    },
  conditions: {
    type: Array,
    label: "Conditions",
    optional: true
  },
    "conditions.$": {
      type: Schema.condition
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
