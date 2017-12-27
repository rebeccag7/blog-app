var bodyParser = require("body-parser"),
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();


// APP CONFIG
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

/*Blog.create({
	title: "Test Blog",
	image: "https://images.unsplash.com/photo-1480930700499-dc44aa7cb2cf?auto=format&fit=crop&w=1950&q=80",
	body: "This is test blog's body."
});*/

// RESTFUL ROUTES
app.get("/", function(req, res) {
	res.redirect("/blogs");
})

app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if (err) {
			console.log("err");
		} else {
				res.render("index", {blogs: blogs});
		}
	});
});

app.listen(3000, () => console.log('The server has started!'));

