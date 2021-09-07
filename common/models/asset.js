"use strict";

module.exports = function (Asset) {
  // standard set of validators
  Asset.validatesUniquenessOf("serialNumber", {
    message: "serialNumber is unique",
  });

  Asset.validate("description", customValidator, {
    message: "Bad name",
  });

  function customValidator(err) {
    if (this.description === "description") err();
  }

  Asset.on("dataSourceAttached", function (obj) {
    Asset.deleteById = function (id, cb) {
      console.log("override!");
      cb(null);
    };
  });
};
