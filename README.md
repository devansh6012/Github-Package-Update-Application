# Github-Package-Update-Application


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Features</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

<!-- Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description` -->

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Node.js](https://nodejs.org/en/)
<!-- * [React.js](https://reactjs.org/)
* [Vue.js](https://vuejs.org/)
* [Angular](https://angular.io/)
* [Svelte](https://svelte.dev/)
* [Laravel](https://laravel.com)
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com) -->

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

<!-- This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps. -->

### Prerequisites

List of things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

* github command line to use gh

  Download from [https://cli.github.com/](https://cli.github.com/)
  
  Once downloaded restart the system and check if downloaded in your system with
  ```sh
  gh --version
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/dyte-submissions/dyte-vit-2022-devansh6012.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. npm link in terminal to use myawesometool placed in package.json
   ```sh
   npm link
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Given a list of Github repositories this project can give the current version of that dependency and tell if the version is greater than or equal to the version specified or not. 

### How to use this project
### Step by Step Guide

The very first step after cloning the project is to use **npm link** in terminal to use **myawesometool**

Make sure usse install github command line to use gh. Download from [https://cli.github.com/](https://cli.github.com/)

<!-- input file image -->

First is the input CSV File  
Input file should have two colums "name" and "repo" where "repo" is the link to the github repository 
below is an input CSV file example

<!-- output file image 1 -->

For command like  
myawesometool -i <-input file-> <-package name->@<-version->  

The application will go through the input file and for each repo link it will go through its package.json file and check if the version is equal to or greater than the version specified in command or if is it less. If it is equal or greater version then the output for that link would be true otherwise false would be written against that repo link. All this output would be generated in a **new output.csv file**

Below is an example command  
   ```sh
   myawesometool -i input.csv axios@0.23.0
   ```
The output CSV file comes out to be


<!-- output file image 2 -->

For command like  
myawesometool update -i <-input file-> <-package name->@<-version->  

The application will go through the input file and for each repo link it will go through its package.json file and check if the version is equal to or greater than the version specified in command or if is it less. If it is equal or greater version then the output for that link would be true otherwise false would be written against that repo link and for we would clone and fork that github repository and update its version in package.json file. After updating it we would commit and push and make a pull request. The generated pull request link would be written against the repo link whose satisfy value came out to be false. All this output would be generated in a **new output.csv file**

Below is an example command  
   ```sh
   myawesometool -update -i input.csv axios@0.23.0
   ```
The output CSV file comes out to be

Here is [Demo Video](https://drive.google.com/file/d/1beso1sW6GiHTh4uzT8_xuqfybEjf0dxy/view?usp=sharing)


<!-- ROADMAP -->
## Features

- [ ] The application will go through the input file and for each repo link it will go through its package.json file and check if the version is equal to or greater than the version specified in command or if is it less for command like myawesometool -i <-input file-> <-package name->@<-version->. 
- [ ] Update the dependencies in package.json file for those repos whose value came out to be false for command like myawesometool update -i <-input file-> <-package name->@<-version->
<!-- - [ ] Feature 3
    - [ ] Nested Feature -->

<!-- See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues). -->

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
