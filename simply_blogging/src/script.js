
/* JavaScript */

default_blog = {
    title : "Aliquam"
    ,author : "Elit Scelerisque"
    ,content : " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do \
                 eu consequat ac felis donec et odio. \
                 eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor \
                 Elit scelerisque mauris pellentesque pulvinar pellentesque habitant \
                 morbi tristique. Arcu felis bibendum ut tristique et egestas quis \
                 ipsum. Aliquam eleifend mi in nulla posuere sollicitudin aliquam. \
                 Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. \
                 Urna condimentum mattis pellentesque id nibh tortor id. Amet facilisis \
                 magna etiam tempor orci eu lobortis elementum. Amet commodo nulla \
                 facilisi nullam vehicula. Mattis aliquam faucibus purus in massa \
                 tempor nec feugiat nisl. Viverra maecenas accumsan lacus vel \
                 facilisis. Adipiscing elit duis tristique sollicitudin. Vitae congue \
                 commodo ullamcorper a lacus. Senectus et netus et malesuada fames ac. "
}

function addBlog() {
    if (sessionStorage.getItem("blogs") == null)
        sessionStorage.setItem("blogs", JSON.stringify(default_blog))

    new_title = document.getElementById("new_title").value;
    new_author = document.getElementById("new_author").value;
    new_content = document.getElementById("new_content").value;

    // check that no field is blank
    if (new_title == "" || new_author == "" || new_content == "") {
        alert("All fields must be filled in!") 
        return
    }

    blog = {
        title: new_title
        ,author: new_author
        ,content: new_content
    }

    blogs = JSON.parse(sessionStorage.getItem("blogs"))
    blogs.push(blog)
    sessionStorage.setItem("blogs", JSON.stringify(blogs))

    console.log(blog)

    clearForm();
    loadBlog();
}

function loadBlog() {
    if (sessionStorage.getItem("blogs") == null)
        sessionStorage.setItem("blogs", JSON.stringify([default_blog]))

    result = JSON.parse(sessionStorage.getItem("blogs"))
    result = result[result.length - 1]
    if (result == null)
        return null

    document.getElementById("my_title").innerHTML=result.title;
    document.getElementById("my_name").innerHTML=result.author;
    document.getElementById("my_content").innerHTML=result.content;
}

function load_this_blog(blog) {
    document.getElementById("my_title").innerHTML=blog.title;
    document.getElementById("my_name").innerHTML=blog.author;
    document.getElementById("my_content").innerHTML=blog.content;
}

function load_Dignissimos_blog() {
    blog = {
        title : "Dignissimos"
        ,author : "Maynard"
        ,content : " The red planet Mars, named for the Roman god of war, has long been an \
                    omen in the night sky. And in its own way, the planet’s rusty red \
                    surface tells a story of destruction. Billions of years ago, the \
                    fourth planet from the sun could have been mistaken for Earth’s \
                    smaller twin, with liquid water on its surface—and maybe even life. \
                    Now, the world is a cold, barren desert with few signs of liquid \
                    water. But after decades of study using orbiters, landers, and rovers, \
                    scientists have revealed Mars as a dynamic, windblown landscape that \
                    could—just maybe—harbor microbial life beneath its rusty surface even \
                    today."
    }
    load_this_blog(blog);
    images = Array.from(document.getElementsByClassName("article-image"))
    images.forEach(v => v.src = "img/landscape1.jpeg")
}

function load_Assumenda_blog() {
    blog = {
        title : "Assumenda"
        ,author : "Jimmy"
        ,content : "There’s nothing quite as synonymous with summer as the beach — and \
                    we’ve got good news for those who flock to the surf and sand as soon \
                    as work lets out on Friday afternoon.  Research finds that spending \
                    time by the ocean is pretty good for your wellbeing. In fact, \
                    according to an analysis of English census data published in the \
                    journal Health Place, those who live by the coast report better \
                    physical and mental health than those who don’t.  And in a study \
                    published in the Journal of Coastal Zone Management, participants who \
                    live in homes with ocean views report feeling calmer than those \
                    without them.  So, it makes sense then that Hawaii has earned the \
                    ranking of happiest state in the U.S. by the annual Gallup poll six \
                    times since 2008, doesn’t it?"
    }
    load_this_blog(blog)
    images = Array.from(document.getElementsByClassName("article-image"))
    images.forEach(v => v.src = "img/landscape2.jpeg")
}

function load_Voluptatum_blog() {
    blog = {
        title : "Voluptatum"
        ,author : "Angelina"
        ,content : "In 1873, Nietzsche began to accumulate notes that would be \
                    posthumously published as Philosophy in the Tragic Age of the Greeks. \
                    Between 1873 and 1876, he published four separate long essays: \"David \
                    Strauss: the Confessor and the Writer\", \" On the Use and Abuse of \
                    History for Life\", \"Schopenhauer as Educator\", and \"Richard Wagner in \
                    Bayreuth\". These four later appeared in a collected edition under the \
                    title Untimely Meditations. The essays shared the orientation of a \
                    cultural critique, challenging the developing German culture suggested \
                    by Schopenhauer and Wagner. During this time in the circle of the \
                    Wagners, he met Malwida von Meysenbug and Hans von Bülow. He also \
                    began a friendship with Paul Rée who, in 1876, influenced him into \
                    dismissing the pessimism in his early writings. However, he was deeply \
                    disappointed by the Bayreuth Festival of 1876, where the banality of \
                    the shows and baseness of the public repelled him. He was also \
                    alienated by Wagner's championing of \"German culture\", which Nietzsche \
                    felt a contradiction in terms as well as by Wagner's celebration of \
                    his fame among the German public. All this contributed to his \
                    subsequent decision to distance himself from Wagner."
    }
    load_this_blog(blog)
    images = Array.from(document.getElementsByClassName("article-image"))
    images.forEach(v => v.src = "img/landscape3.jpeg")
}

function clearForm() {
    document.getElementById("new_title").value = "";
    document.getElementById("new_author").value = "";
    document.getElementById("new_content").value = "";
}

// navigating previous and next blogs
index = 0
function next_blog(next) {
    result = JSON.parse(sessionStorage.getItem("blogs"))
    if (result.length == 1)
        return

    step = next ? 1 : -1;
    index = (index + step) % result.length;

    load_this_blog(result[index])
}