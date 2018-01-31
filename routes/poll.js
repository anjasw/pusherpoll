const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const Pusher = require('pusher');

var pusher = new Pusher({
  appId: '465776',
  key: '6a4722e662317700b405',
  secret: 'bfc1d55a8256ec5dd3ab',
  cluster: 'ap1',
  encrypted: true
});


router.get('/',(req,res) => {
  Vote.find().then(votes => res.json({
    success:true,
    votes:votes
  }));
});
router.post('/',(req,res)=>{

  const newVote  = {
    os:req.body.os,
    points: 1
  };
  new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-vote', {
      points:parseInt(vote.points),
      os:vote.os
    });
    return res.json({success: true, messages: 'Thank you for voting'});
  });
});

module.exports = router;
