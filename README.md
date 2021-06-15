## 🚀 Quick start

1.  **🐳 Install Docker**

    https://www.docker.com/products/docker-desktop

1.  **☁️ Clone Repository.**

    Git clone the repo to the directly you like

    ```shell
    git git@github.com:bestalign/bestalign.github.io.git
    cd bestalign.github.io
    ```

1.  **📦 Create and Run the Container.**

    ```shell
    chmod +x *.sh

    ./docker-setup.sh
    ./docker-container-start.sh
    ./gatsby-start.sh
    ```

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

1.  **✍️ Write stuff!.**

    Go to `/content/blog` and duplicate `/content/blog/_template/index.md`
    Fill out the metadata and write stuff!