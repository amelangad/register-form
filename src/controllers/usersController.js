import express from 'express';
const router = express.Router();
const data = {};


router.route('/')
.post((req,res) => {
    res.json({
        "login": req.body.user,
        "password": req.body.pwd,
})
console.log(req.body)}
)

.put((req,res) => {
    res.json({
        "login": req.body.user,
        "password": req.body.pwd,
    })})

.delete((req,res) => {
    res.json({
       "id": req.body.id,
})
});


export default router;