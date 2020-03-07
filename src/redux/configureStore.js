// Use CommonJS require below so we can dynamically simport during build-time.
if(process.env.NODE_ENV === "production") {
    module.exports = require("./configureStore.prod");
} else {
    module.exports = require("./configureStore.dev")
}