const dummy = (blogs) => {
    return 1;
}
  
const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce(
        (acc, curr) => acc + curr, 0
    );
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return "empty blog list";

    const favorite = blogs.reduce((prev, curr) => (prev && prev.likes > curr.likes) ? prev : curr);
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    };
}

const mostLikes = (blogs) => {
    let authors = [];
    let likes = [];

    if (blogs.length === 0) return "no blogs";

    for (let i=0; i<blogs.length; ++i) {
        if (authors.includes(blogs[i].author)) {
            likes[authors.indexOf(blogs[i].author)] += blogs[i].likes;
            console.log("incl.", blogs[i].author, " ", likes[authors.indexOf(blogs[i].author)])
        } 
        else {
            authors.push(blogs[i].author);
            likes.push(blogs[i].likes);
            console.log(blogs[i].author, " ", blogs[i].likes)
        }
    }

    const mostLikedAuthor = authors[likes.indexOf(Math.max(...likes))]
    const likesMostLikedAuthor = Math.max(...likes)

    return {
        author: mostLikedAuthor,
        likes: likesMostLikedAuthor
    }
}

const mostBlogs = (blogs) => {
    let authors = [];
    let occurences = [];

    if (blogs.length === 0) return "no blogs";

    for (let i=0; i<blogs.length; ++i) {
        console.log(blogs[i].author)

        if (authors.includes(blogs[i].author)) {
            occurences[authors.indexOf(blogs[i].author)]++;
            console.log(occurences[authors.indexOf(blogs[i].author)])
        } 
        else {
            occurences.push(1);
            console.log("getting added now");
            authors.push(blogs[i].author);
        }
    }

    const mostOccAuthor = authors[occurences.indexOf(Math.max(...occurences))]
    const occMostOccAuthor = Math.max(...occurences)

    return {
        author: mostOccAuthor,
        blogs: occMostOccAuthor
    }
}

console.log(mostLikes([
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]))

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}