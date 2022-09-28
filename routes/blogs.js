const {
  uuid
} = require("uuidv4");
var express = require("express");
var router = express.Router();

const {
  db
} = require("../mongo");

// Example
router.get("/get-one-example", async function (req, res, next) {
  const blogPost = await db().collection("blogs").findOne({
    id: {
      $exists: true,
    }
  });
  res.json({
    success: true,
    post: blogPost,
  });
});

// GET One ID
router.get('/get-one/:id', async function (req, res, next) {
  try {
    const blogId = req.params.id

    const blogPost = await db().collection("blogs").findOne({
      id: blogId
    })
    res.json({
      success: true,
      post: blogPost
    })
  } catch (err) {
    //In the catch block, we always want to do 2 things: console.log the error and respond with an error object
    console.log(err.name)
    res.json({
      success: false,
      error: err.toString()
    })
  }
});

// POST One
router.post('/create-one', async function (req, res, next) {
  const title = req.body.title
  const text = req.body.text
  const author = req.body.author
  const categories = req.body.categories
  const email = req.body.email
  const starRating = req.body.startRating
  const id = uuid()

  const blogData = {
    title,
    text,
    author,
    categories,
    email,
    id: id,
    createdAt: new Date(),
    lastModified: new Date(),
  }
  const blogPost = await db().collection("blogs").insert(blogData)
  res.json({
    success: true,
    post: blogPost
  })
});

// PUT One
router.put('/update-one/:id', async function (req, res, next) {
  try {
    const blogId = req.params.id
    const title = req.body.title
    const text = req.body.text
    const author = req.body.author
    const categories = req.body.categories
    const email = req.body.email
    const starRating = req.body.starRating
    const lastModified = new Date()

    const blogPost = await db().collection("blogs").update({
      id: blogId
    }, {
      $set: {
        "starRating": starRating,
        "lastModified": lastModified
      }
    })
    res.json({
      success: true,
      update: blogPost
    })
  } catch (err) {
    console.log(err.name)
    res.json({
      success: false,
      error: err.toString()
    })
  }
});

// Delete
router.delete('/delete-one/:id', async function (req, res, next) {
  try {
    const blogId = req.params.id

    const blogPost = await db().collection("blogs").deleteOne({
      id: blogId
    })
    res.json({
      success: true
    })
  } catch (err) {
    console.log(err.name)
    res.json({
      success: false,
      error: err.toString()
    })
  }
});

module.exports = router;