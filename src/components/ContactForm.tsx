export default function ContactForm() {
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="">Name</label>
          <input type="text" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="">Phone (Optional)</label>
          <input type="text" placeholder="010-1234-5678" />
        </div>
        <div>
          <label htmlFor="">Subject</label>
          <select name="" id="">
            <option value="">Select a subject</option>
            <option value="general-inquiry">General inquiry</option>
            <option value="project-inquiry">Project inquiry</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Message</label>
          <textarea
            name=""
            id=""
            placeholder="Tell us about your project or inquiry..."
          ></textarea>
        </div>
        <div>
          <input type="text" />
          <label htmlFor=""></label>
        </div>
        <div>
          <button type="submit">Send Message</button>
        </div>
      </form>
    </div>
  );
}
