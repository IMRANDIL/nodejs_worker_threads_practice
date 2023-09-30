## Benchmarking the performance

# time curl --get http://localhost:8000/blocking -> 

# result below from index.js and worker.js

# <!-- time curl --get http://localhost:8000/blocking
# This is blocking one result: 20000000000
# real    0m18.071s
# user    0m0.000s
# sys     0m0.000s -->


# result below from four_index.js and four-worker.js

# <!-- $ time curl --get http://localhost:8000/blocking
# This is blocking one result: 20000000000
# real    0m4.327s
# user    0m0.000s
# sys     0m0.000s -->


# The comparison is sheer clear above.