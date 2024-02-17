function Contact() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl text-gray-100 font-bold mb-4">Contact Us</h1>
      <form className="bg-gray-300 w-1/4 rounded-lg shadow-md p-8">
        <div className="mb-2 ml">
          <label htmlFor="name" className="block text-blue-500 font-bold mb-2"> {/* Changed color */}
            Name
          </label>
          <input 
            type="text"
            id="name"
            className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-blue-500 font-bold mb-2"> {/* Changed color */}
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3  text-gray-900 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-blue-500 font-bold mb-2"> {/* Changed color */}
            Message
          </label>
          <textarea
            id="message"
            className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md"
            rows="5"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
