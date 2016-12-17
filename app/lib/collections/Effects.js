import SimpleSchema from 'simpl-schema';
Effects = new Mongo.Collection('effects');

Schema.Effects = new SimpleSchema({
  _id: {
    type: String,
    label: "ID",
  },
  name: {
    type: String,
    label: "Name",
  },
  removeCosts: {
    type: Number,
    label: "Remove Costs"
  },
  turnsAffected: {
    type: Number,
    label: "Number of turns this lasts",
    optional: true
  },
  start: {
    type: Array,
    optional: true,
  },
    'start.$': {
      type: Object,
    },
      'start.$.key': {
        type: String,
        optional: true,
      },
      'start.$.operation': {
        type: String,
        optional: true,
      },
      'start.$.value': {
        type: Number,
        optional: true,
      },
  activate: {
    type: Array,
    optional: true,
  },
    'activate.$': {
      type: Object,
    },
      'activate.$.key': {
        type: String,
        optional: true,
      },
      'activate.$.operation': {
        type: String,
        optional: true,
      },
      'activate.$.value': {
        type: Number,
        optional: true,
      },
  action: {
    type: Array,
    optional: true,
  },
    'action.$': {
      type: Object,
    },
      'action.$.key': {
        type: String,
        optional: true,
      },
      'action.$.operation': {
        type: String,
        optional: true,
      },
      'action.$.value': {
        type: Number,
        optional: true,
      },
  finish: {
    type: Array,
    optional: true,
  },
    'finish.$': {
      type: Object,
    },
      'finish.$.key': {
        type: String,
        optional: true,
      },
      'finish.$.operation': {
        type: String,
        optional: true,
      },
      'finish.$.value': {
        type: Number,
        optional: true,
      },
  end: {
    type: Array,
    optional: true,
  },
    'end.$': {
      type: Object,
    },
      'end.$.key': {
        type: String,
        optional: true,
      },
      'end.$.operation': {
        type: String,
        optional: true,
      },
      'end.$.value': {
        type: Number,
        optional: true,
      },
});
