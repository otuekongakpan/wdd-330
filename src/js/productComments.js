// Product Comments Subsystem - W04 Individual Task
export default class ProductComments {
    constructor(productId, parentId) {
        this.productId = productId;
        this.parentId = parentId;
        this.storageKey = `so-comments-${productId}`;
    }

    getComments() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    saveComment(name, text) {
        const comments = this.getComments();
        const newComment = {
            name,
            text,
            date: new Date().toLocaleDateString()
        };
        comments.push(newComment);
        localStorage.setItem(this.storageKey, JSON.stringify(comments));
        return comments;
    }

    renderComments() {
        const parent = document.getElementById(this.parentId);
        const comments = this.getComments();
        if (comments.length === 0) {
            parent.innerHTML = "<p>No comments yet. Be the first!</p>";
            return;
        }
        parent.innerHTML = comments.map(c => `
      <div class="comment">
        <strong>${c.name}</strong> <em> - ${c.date}</em>
        <p>${c.text}</p>
      </div>
    `).join("");
    }

    init() {
        this.renderComments();
        document.getElementById('comment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('comment-name').value.trim();
            const text = document.getElementById('comment-text').value.trim();
            if (!name || !text) return;

            this.saveComment(name, text);
            this.renderComments();
            e.target.reset();
        });
    }
}