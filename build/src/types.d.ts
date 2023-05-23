import { Document, InferSchemaType, Model, Mongoose } from 'mongoose';
export type MongoosePlugin = Mongoose['plugin'];
export type Timestamps = {
    created_at?: Date;
    updated_at?: Date;
    createdAt?: Date;
    updatedAt?: Date;
};
export type DerivedClassSchemaFields<DerivedClass extends {
    schema: any;
}> = InferSchemaType<ReturnType<DerivedClass['schema']>> & Timestamps;
export type DerivedClassDocument<DerivedClass extends {
    schema: any;
}> = DerivedClassSchemaFields<DerivedClass> & DerivedClass;
export type DerivedClassModel<DerivedClass extends {
    schema: any;
}, DerivedClassConstructor> = Model<DerivedClassDocument<DerivedClass>> & DerivedClassConstructor;
export type DerivedDocument<DerivedClass extends {
    schema: any;
}> = Document & DerivedClassDocument<DerivedClass>;
//# sourceMappingURL=types.d.ts.map