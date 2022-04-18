const Vauth = artifacts.require("Vauth");

module.exports = function (deployer) {
  deployer.deploy(Vauth);
};
