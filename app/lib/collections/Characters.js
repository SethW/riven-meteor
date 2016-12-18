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
      "id": {
        type: Number,
        label: "condition ID"
      },
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
        "results.actions": {
          type: Object,
          label: "Actions",
          optional: true,
        },
          "results.actions.operation": {
            type: String,
            optional: true,
          },
          "results.actions.value": {
            type: Number,
            optional: true,
          },
        "results.movement": {
          type: Object,
          label: "Movement",
          optional: true,
        },
          "results.movement.operation": {
            type: String,
            optional: true,
          },
          "results.movement.value": {
            type: Number,
            optional: true,
          },
        "results.dodge": {
          type: Object,
          label: "Dodge",
          optional: true,
        },
          "results.dodge.operation": {
            type: String,
            optional: true,
          },
          "results.dodge.value": {
            type: Number,
            optional: true,
          },
        "results.armor": {
          type: Object,
          label: "Armor",
          optional: true,
        },
          "results.armor.operation": {
            type: String,
            optional: true,
          },
          "results.armor.value": {
            type: Number,
            optional: true,
          },
        "results.types": {
          type: Array,
          optional: true,
        },
          "results.types.$": {
            type: Object,
            optional: true
          },
          "results.types.$.operation": {
            type: String,
            optional: true
          },
          "results.types.$.value": {
            type: String,
            optional: true
          },
        "results.immunities": {
          type: Array,
          optional: true,
        },
          "results.immunities.$": {
            type: Object,
            optional: true
          },
            "results.immunities.$.operation": {
              type: String,
              optional: true
            },
            "results.immunities.$.value": {
              type: String,
              optional: true
            },
        "results.attacks": {
          type: Array,
          label: "Attacks",
          optional: true
        },
          "results.attacks.$": {
            type: Object,
            optional: true,
          },
            "results.attacks.$._id": {
              type: String,
              optional: true,
            },
            "results.attacks.$.range": {
              type: Object,
              optional: true
            },
              "results.attacks.$.range.operation": {
                type: String,
                optional: true
              },
              "results.attacks.$.range.value": {
                type: Number,
                optional: true
              },
            "results.attacks.$.status": {
              type: Object,
              optional: true
            },
              "results.attacks.$.status.operation": {
                type: String,
                optional: true
              },
              "results.attacks.$.status.value": {
                type: String,
                optional: true
              },
            "results.attacks.$.actions": {
              type: Object,
              optional: true
            },
              "results.attacks.$.actions.operation": {
                type: String,
                optional: true
              },
              "results.attacks.$.actions.value": {
                type: Number,
                optional: true
              },
            "results.attacks.$.area": {
              type: Object,
              optional: true
            },
              "results.attacks.$.area.operation": {
                type: String,
                optional: true
              },
              "results.attacks.$.area.value": {
                type: Number,
                optional: true
              },
            "results.attacks.$.accuracy": {
              type: Object,
              optional: true
            },
              "results.attacks.$.accuracy.operation": {
                type: String,
                optional: true
              },
              "results.attacks.$.accuracy.value": {
                type: Number,
                optional: true
              },
            "results.attacks.$.effects": {
              type: Array,
              optional: true
            },
            "results.attacks.$.types": {
              type: Array,
              optional: true
            },
            "results.attacks.$.power": {
              type: Array,
              optional: true
            },
              "results.attacks.$.power.$": {
                type: Object,
                optional: true
              },
                "results.attacks.$.power.$.options": {
                  type: String,
                  optional: true
                },
                "results.attacks.$.power.$.multiplier": {
                  type: Number,
                  optional: true
                },

        "results.abilities": {
          type: Array,
          label: "Abilities",
          optional: true
        },
        "results.abilities.$": {
          type: Object,
          optional: true,
        },
          "results.abilities.$._id": {
            type: String,
            optional: true,
          },
          "results.abilities.$.range": {
            type: Object,
            optional: true
          },
            "results.abilities.$.range.operation": {
              type: String,
              optional: true
            },
            "results.abilities.$.range.value": {
              type: Number,
              optional: true
            },
          "results.abilities.$.status": {
            type: Object,
            optional: true
          },
            "results.abilities.$.status.operation": {
              type: String,
              optional: true
            },
            "results.abilities.$.status.value": {
              type: String,
              optional: true
            },
          "results.abilities.$.actions": {
            type: Object,
            optional: true
          },
            "results.abilities.$.actions.operation": {
              type: String,
              optional: true
            },
            "results.abilities.$.actions.value": {
              type: Number,
              optional: true
            },
          "results.abilities.$.area": {
            type: Object,
            optional: true
          },
            "results.abilities.$.area.operation": {
              type: String,
              optional: true
            },
            "results.abilities.$.area.value": {
              type: Number,
              optional: true
            },
          "results.abilities.$.accuracy": {
            type: Object,
            optional: true
          },
            "results.abilities.$.accuracy.operation": {
              type: String,
              optional: true
            },
            "results.abilities.$.accuracy.value": {
              type: Number,
              optional: true
            },
          "results.abilities.$.effects": {
            type: Array,
            optional: true
          },
          "results.abilities.$.types": {
            type: Array,
            optional: true
          },
          "results.abilities.$.power": {
            type: Array,
            optional: true
          },
            "results.abilities.$.power.$": {
              type: Object,
              optional: true
            },
              "results.abilities.$.power.options": {
                type: String,
                optional: true
              },
              "results.abilities.$.power.multiplier": {
                type: Number,
                optional: true
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
