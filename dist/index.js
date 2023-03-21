"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("./config/express");
const PORT = process.env.PORT || 5000;
async function init() {
    express_1.app.listen(PORT, () => console.log('started server on port:', PORT));
}
init();
//# sourceMappingURL=index.js.map