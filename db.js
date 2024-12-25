const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	mongoose.set("strictQuery", false);
	try {
		mongoose.connect('mongodb+srv://Leila:admin@clustertask.gxsgx.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTask', connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};
