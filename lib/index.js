(async () => {
  try {
    const Main = require('./main')
    await new Main(10).call()
  } catch (e) {
    console.log(e);
  } finally {
    console.log(`[${new Date()}] Done`)
  }
})()
