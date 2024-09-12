function Gazette() {
  return (
    <div className="gazette">
      <header>
        <nav className="bg-gray-800">
          <ul className="flex space-x-4 text-white">
            <li>
              <a href="#" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                News
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Media
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Crime
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Art
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                All Articles
              </a>
            </li>
          </ul>
          <div className="search flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 bg-gray-200 rounded-md"
            />
            <button className="px-3 py-1 bg-gray-300 rounded-md">Search</button>
          </div>
          <button className="signin px-3 py-1 bg-gray-300 rounded-md">
            Sign In
          </button>
        </nav>
      </header>
      <main className="flex flex-col md:flex-row">
        <div className="image">
          <img
            src="https://i.imgur.com/..."
            alt="Bathtub"
            className="w-full h-auto"
          />
        </div>
        <div className="article bg-white p-4">
          <h1 className="text-2xl font-bold">GAZETTE</h1>
          <p className="text-gray-700">
            Integer quis elit sed vulputate ornare massa eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Nam quaerat cumque et ipsa
            suscipit.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Gazette;
