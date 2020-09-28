import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Rate
interface RateProviderAttrs {
  provider: string;
  base: string;
  rates: { [provider: string]: number };
}

// An interface that describes the properties
// that a Rate Model has
interface RateProviderModel extends mongoose.Model<RateProviderDoc> {
  build(attrs: RateProviderAttrs): RateProviderDoc;
}

// An interface that describes the properties
// that a Rate Document has
interface RateProviderDoc extends mongoose.Document {
  provider: string;
  base: string;
  rates: { [provider: string]: number };
}

const rateProviderSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    base: {
      type: String,
      required: true,
    },
    rates: {
      type: Object,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

rateProviderSchema.statics.build = (attrs: RateProviderAttrs) => {
  return new RateProvider(attrs);
};

const RateProvider = mongoose.model<RateProviderDoc, RateProviderModel>(
  'RateProvider',
  rateProviderSchema
);

export { RateProvider };
