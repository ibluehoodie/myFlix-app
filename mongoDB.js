//Movies collection
var movie001 = {
  MovieID: "movie001",
  Title: "Alien",
  Description: "The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission.",
  GenreID: ["genre009", "genre011"],
  Genre: {
    GenreID: "genre009",
    Name: "Horror",
    Description: "The horror genre is centered upon depicting terrifying or macabre events for the sake of entertainment. A thriller might tease the possibility of a terrible event, whereas a horror film will deliver all throughout the film. The best horror movies are designed to get the heart pumping and to show us a glimpse of the unknown.",
    Secondary_Genre:{
      GenreID: "genre011",
      Name: "Science Fiction",
      Description: "Science fiction movies are defined by a mixture of speculation and science. While fantasy will explain through or make use of magic and mysticism, science fiction will use the changes and trajectory of technology and science. Science fiction will often incorporate space, biology, energy, time, and any other observable science."
    }
  },
  Director: {
    Name: "Ridley Scott",
    Bio: "Described by film producer Michael Deeley as 'the very best eye in the business', director Ridley Scott was born on November 30, 1937 in South Shields, Tyne and Wear (then County Durham). His father was an officer in the Royal Engineers and the family followed him as his career posted him throughout the United Kingdom and Europe.",
    Birth_Year: "1937"
  },
  ImagePath: "https://www.imdb.com/title/tt0078748/mediaviewer/rm2032147969/",
  Release_Year: "1979",
  IMDb_Rating: 8.5,
  Featured: true
}
db.movies.insertOne(movie001)

var movie002 = {
  MovieID: "movie002",
  Title: "Prometheus",
  Description: "Following clues to the origin of mankind, a team finds a structure on a distant moon, but they soon realize they are not alone.",
  GenreID: ["genre011", "genre012"],
  Genre: {
    GenreID: "genre011",
    Name: "Science Fiction",
    Description: "Science fiction movies are defined by a mixture of speculation and science. While fantasy will explain through or make use of magic and mysticism, science fiction will use the changes and trajectory of technology and science. Science fiction will often incorporate space, biology, energy, time, and any other observable science.",
    Secondary_Genre: {
      GenreID: "genre012",
      Name: "Thriller",
      Description: "A psychological thriller focuses and emphasizes the unstable psychological state of the characters inside the story. Often there is a mysterious set of circumstances, and a paranoia, warranted or otherwise, that catalyzes extreme actions from the characters."
    }
  },
  Director: {
    Name: "Ridley Scott",
    Bio: "Described by film producer Michael Deeley as 'the very best eye in the business', director Ridley Scott was born on November 30, 1937 in South Shields, Tyne and Wear (then County Durham). His father was an officer in the Royal Engineers and the family followed him as his career posted him throughout the United Kingdom and Europe.",
    Birth_Year: "1937"
  },
  ImagePath: "https://www.imdb.com/title/tt1446714/mediaviewer/rm430486784/",
  Release_Year: "2012",
  IMDb_Rating: 7.0,
  Featured: true
}
db.movies.insertOne(movie002)

var movie003 = {
  MovieID: "movie003",
  Title: "Starship Troopers",
  Description: "Following clues to the origin of mankind, a team finds a structure on a distant moon, but they soon realize they are not alone.",
  GenreID: ["genre011", "genre009"],
  Genre: {
    GenreID: "genre011",
    Name: "Science Fiction",
    Description: "Science fiction movies are defined by a mixture of speculation and science. While fantasy will explain through or make use of magic and mysticism, science fiction will use the changes and trajectory of technology and science. Science fiction will often incorporate space, biology, energy, time, and any other observable science.",
    Secondary_Genre:{
      GenreID: "genre009",
      Name: "Horror",
      Description: "The horror genre is centered upon depicting terrifying or macabre events for the sake of entertainment. A thriller might tease the possibility of a terrible event, whereas a horror film will deliver all throughout the film. The best horror movies are designed to get the heart pumping and to show us a glimpse of the unknown."
    }
  },
  Director: {
    Name: "Paul Verhoeven",
    Bio: "Paul Verhoeven graduated from the University of Leiden, with a degree in math and physics. He entered the Royal Netherlands Navy, where he began his film career by making documentaries for the Navy and later for TV.",
    Birth_Year: "1938"
  },
  ImagePath: "https://www.imdb.com/title/tt0120201/mediaviewer/rm701657344/",
  Release_Year: "1997",
  IMDb_Rating: 7.3,
  Featured: true
}
db.movies.insertOne(movie003)

var movie004 = {
  MovieID: "movie004",
  Title: "Dune",
  Description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
  GenreID: ["genre005", "genre011"],
  Genre: {
    GenreID: "genre005",
    Name: "Drama",
    Description: "The drama genre is defined by conflict and often looks to reality rather than sensationalism. Emotions and intense situations are the focus, but where other genres might use unique or exciting moments to create a feeling, movies in the drama genre focus on common occurrences.",
    Secondary_Genre: {
      GenreID: "genre011",
      Name: "Science Fiction",
      Description: "Science fiction movies are defined by a mixture of speculation and science. While fantasy will explain through or make use of magic and mysticism, science fiction will use the changes and trajectory of technology and science. Science fiction will often incorporate space, biology, energy, time, and any other observable science."
    }
  },
  Director: {
    Name: "Denis Villeneuve",
    Bio: "Denis Villeneuve is a French Canadian film director and writer. He was born in 1967, in Trois-Rivières, Québec, Canada. He started his career as a filmmaker at the National Film Board of Canada.",
    Birth_Year: "1967"
  },
  ImagePath: "https://www.imdb.com/title/tt1160419/mediaviewer/rm2910452737/",
  Release_Year: "2021",
  IMDb_Rating: 8.1,
  Featured: true
}
db.movies.insertOne(movie004)

var movie005 = {
  MovieID: "movie005",
  Title: "Se7en",
  Description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
  GenreID: ["genre012", "genre004"],
  Genre: {
    GenreID: "genre012",
    Name: "Thriller",
    Description: "A psychological thriller focuses and emphasizes the unstable psychological state of the characters inside the story. Often there is a mysterious set of circumstances, and a paranoia, warranted or otherwise, that catalyzes extreme actions from the characters.",
    Secondary_Genre: {
      GenreID: "genre004",
      Name: "Crime",
      Description: "The crime genre deals with both sides of the criminal justice system but does not focus on legislative matters or civil suits and legal actions. The best crime movies often occupy moral gray areas where heroes and villains are much harder to define."
    }
  },
  Director: {
    Name: "David Fincher",
    Bio: "David Fincher was born in 1962 in Denver, Colorado, and was raised in Marin County, California. When he was 18 years old he went to work for John Korty at Korty Films in Mill Valley. He subsequently worked at ILM (Industrial Light and Magic) from 1981-1983.",
    Birth_Year: "1962"
  },
  ImagePath: "https://www.imdb.com/title/tt0114369/mediaviewer/rm3116368640/",
  Release_Year: "1995",
  IMDb_Rating: 8.6,
  Featured: true
}
db.movies.insertOne(movie005)

var movie006 = {
  MovieID: "movie006",
  Title: "Alien 3",
  Description: "After her last encounter, Ellen Ripley crash-lands on Fiorina 161, a maximum security prison. When a series of strange and deadly events occur shortly after her arrival, Ripley realizes that she has brought along an unwelcome visitor.",
  GenreID: ["genre009", "genre011"],
  Genre: {
    GenreID: "genre009",
    Name: "Horror",
    Description: "The horror genre is centered upon depicting terrifying or macabre events for the sake of entertainment. A thriller might tease the possibility of a terrible event, whereas a horror film will deliver all throughout the film. The best horror movies are designed to get the heart pumping and to show us a glimpse of the unknown.",
    Secondary_Genre:{
      GenreID: "genre011",
      Name: "Science Fiction",
      Description: "Science fiction movies are defined by a mixture of speculation and science. While fantasy will explain through or make use of magic and mysticism, science fiction will use the changes and trajectory of technology and science. Science fiction will often incorporate space, biology, energy, time, and any other observable science."
    }
  },
  Director: {
    Name: "David Fincher",
    Bio: "David Fincher was born in 1962 in Denver, Colorado, and was raised in Marin County, California. When he was 18 years old he went to work for John Korty at Korty Films in Mill Valley. He subsequently worked at ILM (Industrial Light and Magic) from 1981-1983.",
    Birth_Year: "1962"
  },
  ImagePath: "https://www.imdb.com/title/tt0103644/mediaviewer/rm957568768/",
  Release_Year: "1992",
  IMDb_Rating: 6.4,
  Featured: true
}
db.movies.insertOne(movie006)

var movie007 = {
  MovieID: "movie007",
  Title: "Dune",
  Description: "A Duke's son leads desert warriors against the galactic emperor and his father's evil nemesis to free their desert world from the emperor's rule.",
  GenreID: ["genre011", "genre005"],
  Genre: {
    GenreID: "genre011",
    Name: "Science Fiction",
    Description: "Science fiction movies are defined by a mixture of speculation and science. While fantasy will explain through or make use of magic and mysticism, science fiction will use the changes and trajectory of technology and science. Science fiction will often incorporate space, biology, energy, time, and any other observable science.",
    Secondary_Genre: {
      GenreID: "genre005",
      Name: "Drama",
      Description: "The drama genre is defined by conflict and often looks to reality rather than sensationalism. Emotions and intense situations are the focus, but where other genres might use unique or exciting moments to create a feeling, movies in the drama genre focus on common occurrences."
    }
  },
  Director: {
    Name: "David Lynch",
    Bio: "Born in precisely the kind of small-town American setting so familiar from his films, David Lynch spent his childhood being shunted from one state to another as his research scientist father kept getting relocated.",
    Birth_Year: "1946"
  },
  ImagePath: "https://www.imdb.com/title/tt0087182/mediaviewer/rm423377408/",
  Release_Year: "1984",
  IMDb_Rating: 6.3,
  Featured: true
}
db.movies.insertOne(movie007)

var movie008 = {
  MovieID: "movie008",
  Title: "Blue Velvet",
  Description: "The discovery of a severed human ear found in a field leads a young man on an investigation related to a beautiful, mysterious nightclub singer and a group of psychopathic criminals who have kidnapped her child.",
  GenreID: ["genre012", "genre004"],
  Genre: {
    GenreID: "genre012",
    Name: "Thriller",
    Description: "A psychological thriller focuses and emphasizes the unstable psychological state of the characters inside the story. Often there is a mysterious set of circumstances, and a paranoia, warranted or otherwise, that catalyzes extreme actions from the characters.",
    Secondary_Genre: {
      GenreID: "genre004",
      Name: "Crime",
      Description: "The crime genre deals with both sides of the criminal justice system but does not focus on legislative matters or civil suits and legal actions. The best crime movies often occupy moral gray areas where heroes and villains are much harder to define."
    }
  },
  Director: {
    Name: "David Lynch",
    Bio: "Born in precisely the kind of small-town American setting so familiar from his films, David Lynch spent his childhood being shunted from one state to another as his research scientist father kept getting relocated.",
    Birth_Year: "1946"
  },
  ImagePath: "https://www.imdb.com/title/tt0090756/mediaviewer/rm2221104128/",
  Release_Year: "1986",
  IMDb_Rating: 7.7,
  Featured: true
}
db.movies.insertOne(movie008)

var movie009 = {
  MovieID: "movie009",
  Title: "Mulholland Drive",
  Description: "After a car wreck on the winding Mulholland Drive renders a woman amnesiac, she and a perky Hollywood-hopeful search for clues and answers across Los Angeles in a twisting venture beyond dreams and reality.",
  GenreID: ["genre012", "genre005"],
  Genre: {
    GenreID: "genre012",
    Name: "Thriller",
    Description: "A psychological thriller focuses and emphasizes the unstable psychological state of the characters inside the story. Often there is a mysterious set of circumstances, and a paranoia, warranted or otherwise, that catalyzes extreme actions from the characters.",
    Secondary_Genre: {
      GenreID: "genre005",
      Name: "Drama",
      Description: "The drama genre is defined by conflict and often looks to reality rather than sensationalism. Emotions and intense situations are the focus, but where other genres might use unique or exciting moments to create a feeling, movies in the drama genre focus on common occurrences."
    }
  },
  Director: {
    Name: "David Lynch",
    Bio: "Born in precisely the kind of small-town American setting so familiar from his films, David Lynch spent his childhood being shunted from one state to another as his research scientist father kept getting relocated.",
    Birth_Year: "1946"
  },
  ImagePath: "https://www.imdb.com/title/tt0166924/mediaviewer/rm3964200449/",
  Release_Year: "2001",
  IMDb_Rating: 7.9,
  Featured: true
}
db.movies.insertOne(movie009)

var movie010 = {
  MovieID: "movie010",
  Title: "True Romance",
  Description: "In Detroit, a lonely pop culture geek marries a call girl, steals cocaine from her pimp, and tries to sell it in Hollywood. Meanwhile, the owners of the cocaine, the Mob, track them down in an attempt to reclaim it.",
  GenreID: ["genre004", "genre005"],
  Genre: {
    GenreID: "genre004",
    Name: "Crime",
    Description: "The crime genre deals with both sides of the criminal justice system but does not focus on legislative matters or civil suits and legal actions. The best crime movies often occupy moral gray areas where heroes and villains are much harder to define.",
    Secondary_Genre: {
      GenreID: "genre005",
      Name: "Drama",
      Description: "The drama genre is defined by conflict and often looks to reality rather than sensationalism. Emotions and intense situations are the focus, but where other genres might use unique or exciting moments to create a feeling, movies in the drama genre focus on common occurrences."
    }
  },
  Director: {
    Name: "Tony Scott",
    Bio: "Tony Scott was a British-born film director and producer. He was the youngest of three brothers, one of whom is fellow film director Ridley Scott. He was born in North Shields, Northumberland, England to parents Jean and Colonel Francis Percy Scott. As a result of his father's career in the British military, his family moved around a lot.",
    Birth_Year: "1944"
  },
  ImagePath: "https://www.imdb.com/title/tt0108399/mediaviewer/rm3132443904/",
  Release_Year: "1993",
  IMDb_Rating: 7.9,
  Featured: true
}
db.movies.insertOne(movie010)

var movie011 = {
  MovieID: "movie011",
  Title: "Domino",
  Description: "A recounting of Domino Harvey's life story. The daughter of actor Laurence Harvey turned away from her career as a Ford model to become a bounty hunter.",
  GenreID: "genre004",
  Genre: {
    GenreID: "genre004",
    Name: "Crime",
    Description: "The crime genre deals with both sides of the criminal justice system but does not focus on legislative matters or civil suits and legal actions. The best crime movies often occupy moral gray areas where heroes and villains are much harder to define."
  },
  Director: {
    Name: "Tony Scott",
    Bio: "Tony Scott was a British-born film director and producer. He was the youngest of three brothers, one of whom is fellow film director Ridley Scott. He was born in North Shields, Northumberland, England to parents Jean and Colonel Francis Percy Scott. As a result of his father's career in the British military, his family moved around a lot.",
    Birth_Year: "1944"
  },
  ImagePath: "https://www.imdb.com/title/tt0421054/mediaviewer/rm2033556736/",
  Release_Year: "2005",
  IMDb_Rating: 5.9,
  Featured: true
}
db.movies.insertOne(movie011)

//GENRES collection
var genre004 = {
  _id: "genre004",
  GenreID: "genre004",
  Name: "Crime",
  Description: "The crime genre deals with both sides of the criminal justice system but does not focus on legislative matters or civil suits and legal actions. The best crime movies often occupy moral gray areas where heroes and villains are much harder to define."
}
db.genres.insertOne(genre004)

var genre005 = {
  _id: "genre005",
  GenreID: "genre005",
  Name: "Drama",
  Description: "The drama genre is defined by conflict and often looks to reality rather than sensationalism. Emotions and intense situations are the focus, but where other genres might use unique or exciting moments to create a feeling, movies in the drama genre focus on common occurrences."
}
db.genres.insertOne(genre005)

var genre009 = {
  _id: "genre009",
  GenreID: "genre009",
  Name: "Horror",
  Description: "The horror genre is centered upon depicting terrifying or macabre events for the sake of entertainment. A thriller might tease the possibility of a terrible event, whereas a horror film will deliver all throughout the film. The best horror movies are designed to get the heart pumping and to show us a glimpse of the unknown."
}
db.genres.insertOne(genre009)

var genre011 = {
  _id: "genre011",
  GenreID: "genre011",
  Name: "Science Fiction",
  Description: "Science fiction movies are defined by a mixture of speculation and science. While fantasy will explain through or make use of magic and mysticism, science fiction will use the changes and trajectory of technology and science. Science fiction will often incorporate space, biology, energy, time, and any other observable science."
}
db.genres.insertOne(genre011)

var genre012 = {
  _id: "genre012",
  GenreID: "genre012",
  Name: "Thriller",
  Description: "A psychological thriller focuses and emphasizes the unstable psychological state of the characters inside the story. Often there is a mysterious set of circumstances, and a paranoia, warranted or otherwise, that catalyzes extreme actions from the characters."
}
db.genres.insertOne(genre012)

//USERS collection
var user001 = {
  "Username":"JacobKrummel",
  "Password": "$2b$10$P2c3Fb1r96dodSzQ/e/Da.9DxBJVdiB4vQwhWUpLC2JeKGUt22dEG",//"slagsted",
  "Email":"jkrummel@usarmy.org",
  "Birthday": "1928-05-20",
  "FavoriteMovies":[]
}
db.users.insertOne(user001)
token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc0NGQ2MzljYzBjN2RiYjM1ZDU2ZDkiLCJVc2VybmFtZSI6IkphY29iS3J1bW1lbCIsIlBhc3N3b3JkIjoiJDJiJDEwJFAyYzNGYjFyOTZkb2RTelEvZS9EYS45RHhCSlZkaUI0dlF3aFdVcExDMkplS0dVdDIyZEVHIiwiRW1haWwiOiJqa3J1bW1lbEB1c2FybXkub3JnIiwiQmlydGhkYXkiOiIxOTI4LTA0LTIwVDAwOjAwOjAwLjAwMFoiLCJGYXZvcml0ZU1vdmllcyI6W10sIl9fdiI6MCwiaWF0IjoxNjUxNzkwMTM5LCJleHAiOjE2NTIzOTQ5MzksInN1YiI6IkphY29iS3J1bW1lbCJ9.AA0dU2gzbnESF_xmaS5LgyL5IDIhqoXKiM30uIQGNHQ"

var user002 = {
    "Username": "JoeMorning",
    "Password": "$2b$10$qJ9ISL9DmjKC5MXCz5VcPeJtRTK6zJiq0iZJyNoni2FOZrTz4XFva",
    "Email": "jmorning@usarmy.org",
    "Birthday": "1935-12-25T00:00:00.000Z",
    "FavoriteMovies": [],
    "_id": "6279c562a68a33a2878fea9b",
    "__v": 0
}
db.users.insertOne(user002)

var user003 = {
  Username:"JameCrumley",
  Password:"sugrue",
  Email:"jcrumley@usarmy.org",
  Birthday: "1907-05-05",
  FavoriteMovies:[]
}
db.users.insertOne(user003)

var user004 = {
  Username:"VinceNoir",
  Password:"crackfox",
  Email:"vnoir@mboosh.com",
  Birthday: "1969-11-05",
  FavoriteMovies:[]
}
db.users.insertOne(user004)

var user005 = {
  Username:"HowardMoon",
  Password:"binman",
  Email:"hmoon@mboosh.com",
  Birthday: "1954-4-15",
  FavoriteMovies:[]
}
db.users.insertOne(user005)

//entered via Postman request
var user006 = {
    "Username": "BobFossil",
    "Password": "zooniverse",
    "Email": "bfossil@mboosh.com",
    "Birthday": "1950-12-07",
    "FavoriteMovies": ["626596a4da4183683fe001d8"],
    "_id": "",
    "__v": 0
};

var user007 = {
    "Username": "NabooTheEnigma",
    "Password": "shamanlife",
    "Email": "ntenigma@mboosh.com",
    "Birthday": "1969-06-04",
    "FavoriteMovies": [],
    "_id": "",
    "__v": 0
}

var user008 =  {
    "Username": "Amigos",
    "Password": "tres",
    "Email": "mshort3@hollywood.com",
    "Birthday": "1945-04-01",
    "FavoriteMovies": [],
    "_id": "",
    "__v": 0
}

/*
JWT
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY5ZmMyZTg3YTZkYTFmY2MzZjI4ZTUiLCJVc2VybmFtZSI6IkFtaWdvcyIsIlBhc3N3b3JkIjoidHJlcyIsIkVtYWlsIjoibXNob3J0M0Bob2xseXdvb2QuY29tIiwiQmlydGhkYXkiOiIxOTQ1LTA0LTAxVDAwOjAwOjAwLjAwMFoiLCJGYXZvcml0ZU1vdmllcyI6W10sIl9fdiI6MCwiaWF0IjoxNjUxMTE0Njk3LCJleHAiOjE2NTE3MTk0OTcsInN1YiI6IkFtaWdvcyJ9.kJVt9zR9uani-5a1UuJ41YpVUeO_SAMDKADh0ejxoxg
*/
