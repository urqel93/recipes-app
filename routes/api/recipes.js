const express = require("express");
const router = express.Router();
const passport = require('passport');

const Recipe = require("../../models/Recipes");
const User = require("../../models/User");

//@route  GET api/recipes/test
//@desc   Tests recipes route
//@access Public
router.get('/test', (req, res) => res.json({message: "Recipes works!"}));

//@route  POST api/recipes/add
//@desc   Add recipes
//@access Public
router.post('/add', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Recipe.findOne({name: req.body.name}).then(ing => {
      if (ing) {
        return res.status(400).json("Recipe already exists");
      } else {

        const newRecipe = new Recipe({
          user: req.user.id,
          name: req.body.name,
          ingredients: req.body.ingredients,
          description: req.body.description,
          shortText: req.body.shortText,
        });

        newRecipe.save()
          .then(ing => res.json(ing))
          .catch(err => console.log(err));

      }
    })

  });

//@route  GET api/recipes/
//@desc   Get all recipes
//@access Public
router.get('/', (req, res) => {
  Recipe.find()
    .populate('user')
    .sort({ date: -1 })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipesfound: 'No recipes found' }));
});

//@route  GET api/recipes/
//@desc   Get user recipes
//@access Public
router.get('/myrecipes',passport.authenticate('jwt', {session: false}),
  (req, res) => {
  Recipe.find({user: req.user.id})
    .populate('user')
    .sort({ date: -1 })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipesfound: 'No recipes found' }));
});


module.exports = router;