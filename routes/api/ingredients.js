const express = require("express");
const router = express.Router();

const Ingredient = require("../../models/Ingredient");

//@route  GET api/users/test
//@desc   Tests users route
//@access Public
router.get('/test', (req, res) => res.json({message: "Ingredients works!"}));

//@route  POST api/ingredient/add
//@desc   Add Ingredients
//@access Public
router.post('/add', (req, res) => {

  Ingredient.findOne({name: req.body.name}).then(ing => {
    if (ing) {
      return res.status(400).json("Ingredient already exists");
    } else {

      const newIngredient = new Ingredient({
        name: req.body.name
      });

      newIngredient.save()
        .then(ing => res.json(ing))
        .catch(err => console.log(err));

    }
  })

});

//@route  get api/ingredient/
//@desc   Get all ingredients
//@access Public
router.get('/', (req, res) => {
  Ingredient.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noingredientsfound: 'No ingredients found' }));
});


module.exports = router;
