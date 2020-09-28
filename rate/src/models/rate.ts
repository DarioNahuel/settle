import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Rate
interface RateAttrs {
  provider: string;
  pair: string;
  fee_percent: number;
}

// An interface that describes the properties
// that a Rate Model has
interface RateModel extends mongoose.Model<RateDoc> {
  build(attrs: RateAttrs): RateDoc;
}

// An interface that describes the properties
// that a Rate Document has
interface RateDoc extends mongoose.Document {
  provider: string;
  pair: string;
  fee_percent: number;
}

const rateSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    pair: {
      type: String,
      required: true,
    },
    fee_percent: {
      type: Number,
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

rateSchema.statics.build = (attrs: RateAttrs) => {
  return new Rate(attrs);
};

const Rate = mongoose.model<RateDoc, RateModel>('Rate', rateSchema);

export { Rate };
