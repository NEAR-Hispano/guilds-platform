#
# Makefile for libcfdi
#


lint:
	cargo clippy --all-targets --all-features -- -D warnings

# Build wasm for near
build:
	cargo build --target wasm32-unknown-unknown --release

test:
	RUST_BACKTRACE=1 cargo test "${TEST_PREFIX}" -- --color always --nocapture

format:
	cargo fmt -- --check

doc:
	cargo doc

clean:
	cargo clean
