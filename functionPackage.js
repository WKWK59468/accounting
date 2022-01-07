module.exports = {
  resultType: (status, message, payload) => {
    return {
      status: status,
      message: message,
      payload: payload,
    }
  },
}
