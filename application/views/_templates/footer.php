    </div>
  </div>
  <footer class="page-footer">
    <div class="footer-copyright">
      <div class="container">
        Copyright ⓒ 2018 MoonJuhan. All rights reserved.
        <span class="right">PMML</span>
      </div>
    </div>
  </footer>

</body>
<script src="<?php echo URL; ?>public/js/finder.js"></script>

<!-- template for the modal component -->
<script type="text/x-template" id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">

					<div class="modal-header">
						<slot name="header">
						</slot>
					</div>

					<div class="modal-body">
						<slot name="body">
						</slot>
					</div>

					<div class="modal-footer">
						<slot name="footer">
							<a class="waves-effect waves-light btn" @click="$emit('close')">Close</a>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</script>

</html>
