npx protoc-gen-grpc --js_out=import_style=commonjs,binary:./ --grpc_out=./ --proto_path ./ ./*.proto