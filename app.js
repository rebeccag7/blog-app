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
	image: "https://images.unsplash.com/photo-1480930700499-dc44aa7cb2cf?auto=format&fit=crop&w=500&q=80",
	body: "This is test blog's body."
});*/

// RESTFUL ROUTES
app.get("/", function(req, res) {
	res.redirect("/blogs");
})

// INDEX ROUTE
app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if (err) {
			console.log("err");
		} else {
				res.render("index", {blogs: blogs});
		}
	});
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
	res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
	Blog.create(req.body.blog, function(err, newBlog) {
		if (err) {
			res.render("new");
		} else {
			// redirect to the index
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, () => console.log('The server has started!'));

