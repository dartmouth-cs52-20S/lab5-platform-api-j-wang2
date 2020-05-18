import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    username: { type: String },
    password: { type: String },
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
});

UserSchema.pre('save', function beforeUserSave(next) {
    // this is a reference to our model
    // the function runs in some other context so DO NOT bind it
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // otherwise salt & ash password
    const salt = bcrypt.genSaltSync(10); // generate salt
    const hash = bcrypt.hashSync(`${user.password}`, salt);// hash password

    console.log(hash);
    user.password = hash;
    return next();
});


// adapted from http://stackoverflow.com/questions/14588032/mongoose-password-hashing
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
    // return callback(null, comparisonResult) for success
    // or callback(error) in the error case
    bcrypt.compare(candidatePassword, this.password, (error, comparisonResult) => {
        if (error) return callback(error);
        return callback(null, comparisonResult);
    });
};

const User = mongoose.model('User', UserSchema);

export default User;
