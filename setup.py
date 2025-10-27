from setuptools import setup, Extension
from platform import system

setup(
    packages=["tree_sitter_basic"],
    package_dir={"": "bindings/python"},
    package_data={
        "tree_sitter_basic": ["*.pyi", "py.typed"],
    },
    ext_modules=[
        Extension(
            name="tree_sitter_basic._binding",
            sources=[
                "bindings/python/tree_sitter_basic/binding.c",
                "src/parser.c",
            ],
            include_dirs=["src"],
            extra_compile_args=(
                ["-std=c11"] if system() != "Windows" else []
            ),
        )
    ],
    zip_safe=False
)
