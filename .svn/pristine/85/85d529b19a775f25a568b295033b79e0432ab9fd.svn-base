<template>
	<div>
		<el-tree 
			class="filter-tree" 
			:data="treeData" 
			:props="defaultProps" 
			default-expand-all
			:expand-on-click-node=false
			@node-click="handleTreeClick" 
			:filter-node-method="filterNode"
			ref="tree">
			<span class="custom-tree-node" slot-scope="{ node, data }">
		        <span class="el-tree-label">
		            <i class="icon_file" v-if="currentNode != data.id"></i>
					<i class="icon_file_choose" v-if="currentNode == data.id"></i>
					{{ node.label}}
		        </span>
			</span>
		</el-tree>
	</div>
</template>

<script>
	export default {
		name: 'homeTree',
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
			}
		},
		props: ['treeData','filterText','currentNode'],
		data() {
			return {
				defaultProps: {
					id: 'id',
					kstype: 'kstype',
					children: 'children',
					label: 'name',
				},
				//currentNode:'',
			};
		},
		methods: {
			//主题树点击事件
			handleTreeClick(params) {
				//this.currentNode = params.id;
				this.$emit('handleTree',params);
			},
			filterNode(value, data) {
				if(!value) return true;
				return data.name.indexOf(value) !== -1;
			}
		},
	};
</script>
<style scoped>
	@import url("./homeTree.css");
</style>