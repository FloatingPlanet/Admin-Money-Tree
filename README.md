
### Admin page for [FloatingPlanet](https://catopia.ca)
##### [Demo](https://silver-piggy.firebaseapp.com/) built from this template. test account: test@test.com, pwd: test123456
##### Itergrated with [Nebular](https://akveo.github.io/nebular/docs/components/components-overview)
##### Icon list [Eva Icons](https://akveo.github.io/eva-icons/#/)
##### If you add http function in firebase, please remember adding function permission in [GCP](https://console.cloud.google.com/functions/list?project=fake-money-tree&authuser=3) may enable billing
##### Animation CSS [Animate.css](https://daneden.github.io/animate.css/)
##### Data visualization [echarts](https://echarts.apache.org/zh/feature.html)
Side notes:
  1. Use CanActive for validating legit access to certain conponenet (e.g. index.html can be activated if and only if admin is logged in).
  2. Only user who is granted as admin role can login into admin page. (grant permission in admin->admins->permission), this is accomplished by using firebase functions, setUserClaims
  3. TODO: current version is semi-mobile compatitable.
#### Most of the features are moved to silver-piggy repo. This repo is no longer under construction!
#### new features are move to silver-piggy
