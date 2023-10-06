import { getSingleElements } from "./dom.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const POST_PARAM = `social/posts?`;
const container = getSingleElements(".feed-main__posts");
async function getAllPosts(limit, offset) {
  console.log(offset);
  try {
    const response = await fetch(
      BASE_URL + `social/posts?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    data.forEach(({ title, body, media, id, tags }) => {
      container.append(createHTML(title, body, media, id, tags));
    });
  } catch (err) {
    console.error(err);
  }
}

function createHTML(title, body, media, id, tags) {
  const card = document.createElement("div");
  card.className = "feed-main__posts-card";
  card.setAttribute("id", id);
  const cardHeader = document.createElement("div");
  cardHeader.className = "feed-main__posts-card__header";
  const cardBody = document.createElement("div");
  cardBody.className = "feed-main__posts-card__body";
  const cardFooter = document.createElement("div");
  cardFooter.className = "feed-main__posts-card__footer";
  if (media) {
    const feedHeaderImage = document.createElement("img");
    feedHeaderImage.className = "feed-main__posts-card--header--img";
    feedHeaderImage.src = media;
    feedHeaderImage.alt = "image";
    cardHeader.appendChild(feedHeaderImage);
  }

  const feedBodyTitle = document.createElement("p");
  feedBodyTitle.className = "feed-main__posts-card--body--title";
  feedBodyTitle.textContent = title;
  const feedBodyContent = document.createElement("p");
  feedBodyContent.className = "feed-main__posts-card--body--text";
  feedBodyContent.textContent = body;
  const feedTagsContent = document.createElement("p");
  feedTagsContent.className = "feed-main__posts-card--body--tags";
  feedTagsContent.textContent = tags;
  cardBody.append(feedBodyTitle, feedBodyContent);
  cardFooter.append(feedTagsContent);
  card.append(cardHeader, cardBody, cardFooter);
  return card;
}

function observe(trigger) {
  let limit = 4;
  let offset = 0;
  const load = 4;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (limit < 16) {
          getAllPosts(limit, offset);

          limit += load;
          offset = limit;
        } else {
          limit = 0;
          offset = 0;

          console.log("done");
        }
      }
    });
  });

  observer.observe(trigger);
}

observe(getSingleElements(".observer-trigger"));

/*  
class AllPosts {
  constructor(postFeedEl, btn) {
    this.postFeedEl = postFeedEl;
}
  async allPostsEntries(limit, offset) {
    try {
      const res = await fetch(BASE_URL + `social/posts?limit=${limit}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json; charset=UTF-8",
        },
      });

      const data = await res.json();
     
      return data;
    } catch (error) {}
  }
  async handleEntries(limit) {
    try {
      let postLimit = 1;
      const data = await this.allPostsEntries(limit);
       //adjust?
      const limitResult = data.slice(0);
      const dataWithMedia = limitResult.filter((entry) => entry.media);
      dataWithMedia.forEach((entry) => {
        const { title, body, id, tags, media } = entry;
        this.createFeedEl(title, body, id, tags, media);
      });
    } catch (error) {}
  }
  
  createFeedEl(title, body, id, tags, media) {
   
    const card = document.createElement("div");
   
    card.className = "feed-main__posts-card";
    card.setAttribute("id", id);
    const cardHeader = document.createElement("div");
    cardHeader.className = "feed-main__posts-card__header";
    const cardBody = document.createElement("div");
    cardBody.className = "feed-main__posts-card__body";
    const cardFooter = document.createElement("div");
    cardFooter.className = "feed-main__posts-card__footer";
      if (media) {
        const feedHeaderImage = document.createElement("img");
        feedHeaderImage.className = "feed-main__posts-card--header--img";
        feedHeaderImage.src = media;
        feedHeaderImage.alt = "image"
        cardHeader.appendChild(feedHeaderImage);
      }

    const feedBodyTitle = document.createElement("p")
    feedBodyTitle.className = "feed-main__posts-card--body--title"
    feedBodyTitle.textContent = title
    const feedBodyContent = document.createElement("p");
    feedBodyContent.className = "feed-main__posts-card--body--text";
    feedBodyContent.textContent = body;
    const feedTagsContent = document.createElement("p");
    feedTagsContent.className = "feed-main__posts-card--body--tags";
    feedTagsContent.textContent = tags;
    cardBody.append(feedBodyTitle,feedBodyContent);
    cardFooter.append(feedTagsContent);
    card.append(cardHeader, cardBody, cardFooter);
    this.postFeedEl.append(card);
  }


  async init() {
    try {
      await this.handleEntries();
    } catch (error) {}
  }
}

 const test = new AllPosts(getSingleElements(".feed-main__posts"));
test.allPostsEntries();
test.init();   




class InfiniteScroll extends AllPosts{
   
  constructor(trigger) {
    super();
    this.triggerEl = trigger;  
    console.log(this.triggerEl);
    const observer = new IntersectionObserver(entries => {
      console.log(entries)
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            this.limit += 10;
          this.allPostsEntries(this.limit);
        }
      })
    })
    if (this.triggerEl) {
      observer.observe(this.triggerEl)
    }

}
}

const inf = new InfiniteScroll(getSingleElements(".observer-trigger"))




 */

//create posts

class Post {
  constructor() {}

  async createPost(param) {
    try {
      const res = await fetch(BASE_URL + param, {
        method: "POST",
        body: JSON.stringify({
          title: "test12ww3",
          body: "test123",
          tags: ["game", "mountain", "dancing"],
          media:
            "https://images.unsplash.com/photo-1696024344604-46b33ba2c753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {}
  }
}

const createTest = new Post();
/* createTest.createPost()
 */
